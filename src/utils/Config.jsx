const token = localStorage.getItem('token'); // Replace with your actual function to get the token

      // Include the token in the headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      export default config