import React, { useState } from "react";
import type { Results } from "../models/Results";
import { toast } from 'react-toastify';

export type NumericResultKey = { [K in keyof Results]: Results[K] extends number ? K : never}[keyof Results];

type Props = {
    athleteId: string;
    numericKeys: NumericResultKey[];
    onResultsAdded: () => void;
}

const AddResults: React.FC<Props> = ({ athleteId, numericKeys, onResultsAdded }) => {
    const [newResults, setNewResults] = useState<Partial<Results>[]>( () => 
        Array.from({ length: 10 }, () => ({}))
    )

    const updateNewResultField = (
        index: number,
        key: NumericResultKey,
        value: number
    ) => {
        setNewResults(prev => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [key]: value };
            return copy;
        });
    };

    const addResults = () => {
        const payload = newResults.filter(r =>
            Object.values(r).some(val =>
                val !== undefined && val !== 0
            )
        );
        if (payload.length === 0) {
            toast.info("No new results to add");
            return;
        }

        fetch(`http://localhost:8080/addResults/${athleteId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ results: payload }),
        })
        .then(res => {
            if (!res.ok) throw new Error("Failed to add results");
            return res.json();
        })
        .then(() => {
            setNewResults(Array.from({ length: 10 }, () => ({})));
            onResultsAdded();
            toast.success("New results added!");
        })
        .catch(err => toast.error(err.message));
    };

    return (
        <div>
            <h3>Add New Result Set</h3>
            {newResults.map((res, i) => (
                <div key={i}>
                {numericKeys.map(key => (
                    <div key={key}>
                    <label>{key}</label><br/>
                    <input
                        type="number"
                        step="any"
                        value={res[key] ?? ''}
                        onChange={e =>
                            updateNewResultField(i, key, parseFloat(e.target.value))
                        }
                    /><br/>
                    </div>
                ))}
                </div>
            ))}
            <button onClick={addResults}>
                Add Results
            </button>
        </div>
    );
};
export default AddResults;