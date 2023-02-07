import React from 'react';
import Navigator from './components/Navigator';
export default function App() {
    return (
        <div>
            <Navigator />

            <h1>hi</h1>
            <h1 className="text-5xl font-bold underline">
                Hello world!
            </h1>
            <table className="table-auto bg-primary">
                <thead>
                    <tr>
                        <th>Song</th>
                        <th>Artist</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                        <td>Malcolm Lockyer</td>
                        <td>1961</td>
                    </tr>
                    <tr>
                        <td>Witchy Woman</td>
                        <td>The Eagles</td>
                        <td>1972</td>
                    </tr>
                    <tr>
                        <td>Shining Star</td>
                        <td>Earth, Wind, and Fire</td>
                        <td>1975</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}