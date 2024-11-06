import {createFileRoute} from '@tanstack/react-router'
import {useEffect, useState} from "react";
import axios from "axios";


type Story = {
    objectID: string;
    title: string;
    url: string;
};

const API = "https://hn.algolia.com/api/v1/search";


export const Route = createFileRoute('/_protected/fetch-data/from-state')({
    component: RouteComponent,
})

function RouteComponent() {
    const [data, setData] = useState<Story[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`${API}?query=react`);

            setData(result.data.hits);
        };

        fetchData();
    }, []);


    return (
        <ul>
            {data.map((item) => (
                <li key={item.objectID}>
                    <a href={item.url}>{item.title}</a>
                </li>
            ))}
        </ul>
    );
}
