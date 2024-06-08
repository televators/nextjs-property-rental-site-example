const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch All Properties
async function fetchProperties() {
  try {
    // Handle case where domain isn't available.
    if ( ! apiDomain ) {
      return [];
    }

    const res = await fetch( `${ apiDomain }/properties` );

    if ( ! res.ok ) {
      throw new Error( 'Failed to fetch data.' );
    }

    return res.json();
  } catch (error) {
    console.log( error );

    return [];
  }
}

// Fetch Single Property by ID
async function fetchProperty( id ) {
  try {
    // Handle case where domain isn't available.
    if ( ! apiDomain ) {
      return null;
    }

    const res = await fetch( `${ apiDomain }/properties/${ id }` );

    if ( ! res.ok ) {
      throw new Error( 'Failed to fetch data.' );
    }

    return res.json();
  } catch (error) {
    console.log( error );

    return null;
  }
}

export { fetchProperties, fetchProperty };