type SearchProps = {
    name?: string;
    placeholder?: string;
}

export default function SearchBar({ name = "searchVal", placeholder="Search" }: SearchProps) {
    return (
        <div className="flex justify-center items-center p-4">
            <div className="relative w-full">
                <input
                    type="search"
                    name={name}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-2 border border-secondary rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="absolute left-3 top-2.5 w-5 h-5 text-gray-500"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    );
}
