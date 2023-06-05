"use client";

import { useEffect, useState } from 'react';

const Greeting: React.FC = () => {
    const [greeting, setGreeting] = useState<string>('');

    useEffect(() => {
        const currentHour = new Date().getHours();
        let greetingText: string;

        if (currentHour < 12) {
            greetingText = 'Good morning';
        } else if (currentHour < 18) {
            greetingText = 'Good afternoon';
        } else if (currentHour < 21) {
            greetingText = 'Good evening';
        } else {
            greetingText = 'Good night';
        }

        setGreeting(greetingText);
    }, []);

    return <div>{greeting}</div>;
}

export default Greeting;
