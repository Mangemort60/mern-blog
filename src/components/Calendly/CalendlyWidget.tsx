import { useContext } from 'react';
import { InlineWidget } from 'react-calendly';
import { UserContext } from '../../contexts/UserContext';

const CalendlyWidget = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      {' '}
      <InlineWidget
        url="https://calendly.com/youssratherapie"
        styles={{
          height: '1000px',
          marginTop: '80px',
        }}
        prefill={{
          email: user.email || undefined,
        }}
      />
    </div>
  );
};

export default CalendlyWidget;
