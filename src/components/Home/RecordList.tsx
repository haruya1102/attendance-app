// src/components/RecordList.tsx
import React from 'react';

interface Timestamp {
  type: '出勤' | '退勤';
  timestamp: Date;
}

interface RecordListProps {
  timestamps: Timestamp[];
}

const RecordList: React.FC<RecordListProps> = ({ timestamps }) => {
  return (
    <ul>
      {timestamps.map((timestamp, index) => (
        <li key={index}>
          {`${timestamp.type}: ${timestamp.timestamp.toLocaleString()}`}
        </li>
      ))}
    </ul>
  );
};

export default RecordList;
