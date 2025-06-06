"use client";
import React, { useEffect } from "react";
import { Select } from "../ui";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks/hooks.redux";
import { placeLookupService } from "@/services/public/place-lookup.service";
import { SelectProps } from "../ui/Select";
import ReactSelect from "react-select";

type Props = Omit<SelectProps, "options">;
function Countries({ ...props }: Props) {
   const dispatch = useAppDispatch();
   const { getCountries } = useAppSelector((state) => state.public.placeLookup);

   useEffect(() => {
      dispatch(placeLookupService.getCountries.api());
      return () => {};
   }, []);
   if (getCountries.isLoading) {
      return "loading...";
   }
   return (
      <Select
         {...props}
         options={getCountries.data.map((country) => ({
            label: country.name,
            value: country.isoCode,
         }))}
      />
   );
}

type StateProps = Props & { multi?: boolean; countryCode: string | null };
function States({ multi, countryCode, ...props }: StateProps) {
   const dispatch = useAppDispatch();
   const { getStates } = useAppSelector((state) => state.public.placeLookup);

   useEffect(() => {
      if (countryCode) dispatch(placeLookupService.getStates.api(countryCode));
      return () => {};
   }, [countryCode]);

   if (getStates.isLoading) {
      return "loading...";
   }
   if (multi) {
      return (
         <ReactSelect
            isMulti={multi}
            hideSelectedOptions
            value={getStates?.data
               ?.filter((option) => (props?.value as string[])?.includes(option.isoCode))
               ?.map((group) => ({
                  label: group?.name,
                  value: group?.isoCode,
               }))}
            options={getStates.data.map((country) => ({
               label: country.name,
               value: country.isoCode,
            }))}
            onChange={props.onChange as any}
         />
      );
   }
   return (
      <Select
         {...props}
         options={getStates.data.map((country) => ({
            label: country.name,
            value: country.isoCode,
         }))}
      />
   );
}

type CityProps = Props & { countryCode: string; stateCode: string };
function Cities({ countryCode, stateCode, ...props }: CityProps) {
   const dispatch = useAppDispatch();
   const { getCities } = useAppSelector((state) => state.public.placeLookup);

   useEffect(() => {
      if (countryCode && stateCode)
         dispatch(
            placeLookupService.getCities.api({
               country: countryCode,
               stateCode: stateCode,
            })
         );
      return () => {};
   }, [countryCode, stateCode]);

   if (getCities.isLoading) {
      return "loading...";
   }
   return (
      <Select
         {...props}
         options={getCities.data.map((country) => ({
            label: country.name,
            value: country.name,
         }))}
      />
   );
}
export const Location = { Countries, States, Cities };
