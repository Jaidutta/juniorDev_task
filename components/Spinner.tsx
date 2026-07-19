'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

interface Props {
  loading: boolean;
}

const Spinner = ({ loading }: Props) => {
  return (
    <ClipLoader
      color="rgb(17, 25, 44)"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;