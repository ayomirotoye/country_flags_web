import { Button, Disclosure } from '@headlessui/react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Sikalogo } from './SikaLogo';
import SearchBar from './SearchBar';

export default function Navbar() {
    return (
        <Disclosure as="nav" className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between mt-4 gap-4">
                    <div className="flex items-center h-8 w-auto">
                        <Sikalogo width='120' height='60' />
                    </div>
                    <div className='w-1/2'>
                        <SearchBar />
                    </div>

                </div>
            </div>
        </Disclosure>
    )
}
