import CheckBoxWithLabel from '@/components/shared/inputs/check-box-with-label/CheckBoxWithLabel';
import SelectInput from '@/components/shared/inputs/select-input/SelectInput';
import TextAreaInput from '@/components/shared/inputs/text-area-input/TextAreaInput';
import TextInput from '@/components/shared/inputs/text-input/TextInput';
import { useState } from 'react';

export default function CheckoutForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [note, setNote] = useState('');
    const [subscribe, setSubscribe] = useState(false);
    const [terms, setTerms] = useState(false);
    return (
        <div className="border mx-auto rounded px-4 py-8 w-full">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
                Contact Information
            </h2>
            <div className="mb-4">
                <TextInput label="Email" placeholder="Email *" value={email} setValue={setEmail} variant="small" />
            </div>

            <CheckBoxWithLabel label="Email me with news and offers" checked={subscribe} setChecked={setSubscribe} />

            <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 lg:mb-8">
                <TextInput label="Name *" placeholder="Name " value={name} setValue={setName} variant="small" />
                <TextInput label="Address *" placeholder="Address" value={address} setValue={setAddress} variant="small" />
                <TextInput label="Phone *" placeholder="Phone" value={phone} setValue={setPhone} variant="small" />
                <SelectInput value={country} setValue={setCountry} label="Country *" options={[
                    {
                        label: 'Bangladesh',
                        value: 'BD',
                        selected: true,
                    },
                    {
                        label: 'India',
                        value: 'IN',
                    },
                    {
                        label: 'Pakistan',
                        value: 'PK',
                    },
                    {
                        label: 'Nepal',
                        value: 'NP',
                    },
                    {
                        label: 'USA',
                        value: 'US',
                    },
                    {
                        label: 'UK',
                        value: 'UK',
                    },
                ]} variant={"small"} />
                <SelectInput value={state} setValue={setState} label="State *" options={[
                    {
                        label: 'Dhaka',
                        value: 'BD',
                        selected: true,
                    },
                    {
                        label: 'Chittagong',
                        value: 'IN',
                    },
                    {
                        label: 'Khulna',
                        value: 'PK',
                    },
                    {
                        label: 'Rajshahi',
                        value: 'NP',
                    },
                    {
                        label: 'USA',
                        value: 'US',
                    },
                    {
                        label: 'UK',
                        value: 'UK',
                    },
                ]} variant={"small"} />
                <SelectInput value={city} setValue={setCity} label="City *" options={[
                    {
                        label: 'Dhaka',
                        value: 'BD',
                        selected: true,
                    },
                    {
                        label: 'Chittagong',
                        value: 'IN',
                    },
                    {
                        label: 'Khulna',
                        value: 'PK',
                    },
                    {
                        label: 'Rajshahi',
                        value: 'NP',
                    },
                    {
                        label: 'USA',
                        value: 'US',
                    },
                    {
                        label: 'UK',
                        value: 'UK',
                    },
                ]} variant={"small"} />
                <div className="md:col-span-2">
                    <TextInput label="Postal Code / Pin Code *" placeholder="Postal code" value={postalCode} setValue={setPostalCode} variant="small" />
                </div>
                <div className="md:col-span-2">
                    <TextAreaInput label="Note" value={note} setValue={setNote} variant="small" />
                </div>
            </div>
            <CheckBoxWithLabel label="I agree with the terms and conditions." checked={terms} setChecked={setTerms} />

            <div className="mt-6 flex flex-wrap gap-4">
                <button
                    className="bg-black text-white hover:border hover:border-black text-sm font-semibold py-3 px-6 rounded hover:bg-white hover:text-black transition"
                >
                    CONTINUE TO SHIPPING
                </button>
                <button
                    className="text-black text-sm font-semibold py-3 px-6 rounded border border-black transition"
                >
                    RETURN TO CART
                </button>
            </div>
        </div>
    )
}
