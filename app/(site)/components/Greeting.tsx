import { format, getHours } from 'date-fns';

const Greeting: React.FC = () => {
    const currentHour = getHours(new Date());

    let greeting: string;
    if (currentHour < 12) {
        greeting = 'Good morning';
    } else if (currentHour < 18) {
        greeting = 'Good afternoon';
    } else if (currentHour < 21) {
        greeting = 'Good evening';
    } else {
        greeting = 'Good night';
    }

    return (
        <div>
            {greeting}
        </div>
    );
}

export default Greeting;