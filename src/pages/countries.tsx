import { useState, useRef, useEffect } from "react";

type SubHeadingProps = {
    heading: string;
    subHeading: string;
}

const SectionHeading = ({ heading, subHeading }: SubHeadingProps) => {
    return (
        <><h2 className="text-3xl font-bold text-gray-800 mb-6">{heading}</h2><p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            {subHeading}
        </p></>
    );
}

const fetchCountries = (startIndex: number, count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: startIndex + i + 1,
      name: `Country ${startIndex + i + 1}`,
      currency: "NGN",
      image: `https://i.pravatar.cc/150?img=${(startIndex + i) % 70}`, // Random avatars
    }));
  };

const AppCountries = () => {
    const [country, setCountries] = useState(() => fetchCountries(0, 12));
    const [isFetching, setIsFetching] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const loadMoreCountries = () => {
        setIsFetching(true);
        setTimeout(() => {
          setCountries((prev) => [...prev, ...fetchCountries(prev.length, 6)]);
          setIsFetching(false);
        }, 1000);
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
    }, [isFetching]);

    return (<>
        <section className="container py-16 bg-white sm:px-2 md:px-14">
            <div className="container mx-auto text-center">
                <SectionHeading heading="Countries" subHeading="Listing the countries of the world and their flags" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {country.map((tehCountry, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300"
                        >
                            <img
                                className="w-32 h-32 mx-auto rounded-full mb-4"
                                src={tehCountry.image}
                                alt={tehCountry.name}
                            />
                            <h3 className="text-xl font-semibold text-gray-800">{tehCountry.name}</h3>
                            <p className="text-gray-600">{tehCountry.currency}</p>
                        </div>
                    ))}
                </div>
                <div ref={observerRef} className="h-10 mt-4 flex justify-center">
                    {isFetching && <span className="text-gray-500">Loading more...</span>}
                </div>
            </div>
        </section></>);
}

export default AppCountries;