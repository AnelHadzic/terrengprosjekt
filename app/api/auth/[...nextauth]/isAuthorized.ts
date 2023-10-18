export async function isExistingUser(email: string | null | undefined) {

    const apiUrl = `http://localhost:3000/api/users/${email}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
}

export async function isWhitelisted(email: string | null | undefined) {

    const apiUrl = `http://localhost:3000/api/users/${email}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
}

export async function isWithDomain(email: string | null | undefined) {

    const apiUrl = `http://localhost:3000/api/users/${email}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking user:', error);
      return false;
    }
}
