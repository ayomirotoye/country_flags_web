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

                    <div className="">
                        <Button className="flex items-center gap-2 rounded bg-primary py-3 px-6 text-sm text-white data-[hover]:bg-primary data-[active]:bg-primary">
                            <PlusCircleIcon className="h-4 w-4" />
                            <span>Add New</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}
