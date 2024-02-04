import React from 'react';

const TimeRecords = () => {
  // 実際にはFirebaseから記録を取得
  const records = [
    { date: '2024-02-04', timeIn: '09:00', timeOut: '18:00' },
    // 他の記録...
  ];

  return (
    <div>
      <h2>出退勤記録</h2>
      <ul>
        {records.map((record, index) => (
          <li key={index}>{`${record.date}: 出勤 - ${record.timeIn}, 退勤 - ${record.timeOut}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default TimeRecords;
