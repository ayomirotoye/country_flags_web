import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Country } from '../pages/countries';
import { useEffect, useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { fetchCountryDetailsFromApi } from '../api-lib/countries-api';

type TCountryCard = {
    show: boolean;
    country: Country;
}
const CountryCard = ({ show, country }: TCountryCard) => {
    let [isOpen, setIsOpen] = useState(true)
    const [isFetching, setIsFetching] = useState(false);
    const [countryDetail, setCountryDetail] = useState<Country>({} as Country)

    const fetchCountryDetail = async () => {
        if (isFetching) return;

        setIsFetching(true);
        try {
            const response = await fetchCountryDetailsFromApi(country.iso2);
            setCountryDetail(response);
        } catch (error) {
            console.error("Error loading more countries:", error)
        } finally {
            setIsFetching(false);
        }
    };


    useEffect(() => {
        setIsOpen(show)
        fetchCountryDetail();

        return () => {

        }
    }, [country, show])

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/30 sm:mx-0 sm:size-10">
                                    <InformationCircleIcon aria-hidden="true" className="size-6 text-secondary  " />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        Country Information
                                    </DialogTitle>
                                    <div className="mt-8">
                                        <img
                                            src={country?.flagUrl}
                                            alt={`${countryDetail?.name} flag`}
                                            className="w-full h-48 object-cover rounded-t-lg mb-4"
                                        />
                                        <div className="flex flex-col">
                                            <h2 className="text-2xl font-bold mb-2">{countryDetail.name}</h2>
                                            <div className="mb-2">
                                                <p className="font-semibold">Capital:</p>
                                                <p>{countryDetail.capital || "N/A"}</p>
                                            </div>
                                            <div className="mb-2">
                                                <p className="font-semibold">Population:</p>
                                                <p>{countryDetail.population ? countryDetail.population.toLocaleString() : "N/A"}</p>
                                            </div>
                                            <div className="mb-2">
                                                <p className="font-semibold">Area:</p>
                                                <p>{countryDetail.surfaceArea ? countryDetail.surfaceArea.toLocaleString() + " km²" : "N/A"}</p>
                                            </div>
                                            <div className="mb-2">
                                                <p className="font-semibold">Currency:</p>
                                                <p>{countryDetail.currency ? countryDetail.currency?.name : "N/A"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary/90 sm:ml-3 sm:w-auto"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default CountryCard;