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
    <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4 my-4">
      {timestamps.length > 0 ? (
        timestamps.map((timestamp, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2">
            <span className="font-medium">{timestamp.type}</span>
            <span className="text-sm">{timestamp.timestamp.toLocaleString()}</span>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">記録がありません。</p>
      )}
    </div>
  );
};

export default RecordList;
