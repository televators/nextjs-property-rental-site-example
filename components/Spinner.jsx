'use client';
import { PulseLoader } from "react-spinners";

// NOTE: IMPORTANT! Loader must be imported in curly braces or else it will break Next and throw a vague 500 error.

const override = {
  display: 'block',
  margin: '30vh auto 100px',
  textAlign: 'center',
};

const Spinner = ( { loading } ) => {
  return (
    <PulseLoader
      size={ 32 }
      cssOverride={ override }
      color="#3b82f6"
      loading={ loading }
      aria-label='Loading spinner'
    />
  );
}
export default Spinner;
