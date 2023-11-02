import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import {Paper} from '@mui/material';



function ColumnChart({ elements }) {
    return (
        <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
            <ResponsiveContainer width="100%" height={206}>
                <BarChart data={elements}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="visitors" fill="#FF887A" >
                        {
                            elements.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
}

export default ColumnChart;
