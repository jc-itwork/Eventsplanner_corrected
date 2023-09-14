export const loader = async () => {
    const usersResponse = await fetch("http://localhost:3000/users");
    const eventsResponse = await fetch("http://localhost:3000/events");
    const categoriesResponse = await fetch("http://localhost:3000/categories");
  
    return {
      users: await usersResponse.json(),
      events: await eventsResponse.json(),
      categories: await categoriesResponse.json(),
    };
  };
  