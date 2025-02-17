import { useState, useRef, useEffect } from "react";
import { fetchCountriesFromApi } from "../api-lib/countries-api";
import CountryCard from "../components/CountryDetails";

type SubHeadingProps = {
    heading: string;
    subHeading: string;
}

type Currency = {
    code: string;
    name: string;
}

export interface Country {
    id: number;
    iso2: string;
    name: string;
    unicodeFlag?: string;
    flagUrl?: string;
    capital?: string;
    population?: number;
    surfaceArea?: number;
    currency?: Currency;
}

const SectionHeading = ({ heading, subHeading }: SubHeadingProps) => {
    return (
        <><h2 className="text-3xl font-bold text-gray-800 mb-6">{heading}</h2><p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            {subHeading}
        </p></>
    );
}

const AppCountries = () => {
    const [country, setCountries] = useState<Country[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [currentCountry, setCurrentCountry] = useState<Country>({} as Country)
    const [showDetails, setShowDetails] = useState(false)
    const observerRef = useRef<HTMLDivElement | null>(null);

    const loadMoreCountries = async () => {
        if (isFetching) return;

        setIsFetching(true);
        try {
            const newCountries = await fetchCountriesFromApi(startIndex, 10);
            setCountries((prevCountries) => [...prevCountries, ...newCountries]);
            setStartIndex((prevStartIndex: number) => prevStartIndex + 10)
        } catch (error) {
            console.error("Error loading more countries:", error)
        } finally {
            setIsFetching(false);
        }
    };


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching) {
                    loadMoreCountries();
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleShowDetails = (theCountry: Country) => {
        setCurrentCountry(theCountry)
        setShowDetails(true)
    }

    return (<>
        <section className="container py-16 bg-white md:px-14">
            <CountryCard show={showDetails} country={currentCountry} />
            <div className="container mx-auto text-center">
                <SectionHeading heading="Countries" subHeading="Listing the countries of the world and their flags" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {country.map((theCountry, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer"
                            onClick={() => handleShowDetails(theCountry)}
                        >
                            <img
                                className="w-32 h-32 mx-auto rounded-full mb-4"
                                src={theCountry.flagUrl}
                                alt={theCountry.name}
                            />
                            <h3 className="text-xl font-semibold text-gray-800">{theCountry.name}</h3>
                            <p className="text-gray-600">{theCountry.iso2}</p>

                        </div>
                    ))}
                </div>
                <div ref={observerRef} className="h-10 mt-4 flex justify-center">
                    {isFetching && <span className="text-gray-500">Loading more...</span>}
                </div>
            </div>
        </section>
    </>);
}

export default AppCountries;