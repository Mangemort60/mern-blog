import { InlineWidget } from 'react-calendly';

const CalendlyWidget = () => {
  return (
    <div>
      {' '}
      <InlineWidget
        url="https://calendly.com/hahaddaoui"
        styles={{
          height: '1000px',
          marginTop: '80px',
        }}
        prefill={{
          email: 'hahaddaoui@gmail.com',
        }}
      />
    </div>
  );
};

export default CalendlyWidget;
