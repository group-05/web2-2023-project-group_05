import { getAuthenticatedUser } from '../utils/auths';

const readAllTopics = async () => {
    try {
      const res = await fetch('/api/topics');
      const TopicView = await res.json();
      return TopicView;
    } catch (err) {
      console.error('readAllTopic::error: ', err);
      throw err;
    }
  };

  const addOneTopic = async (topic) => {
    try {
      const authenticatedUser = getAuthenticatedUser();
      const options = {
        method: 'POST',
        body: JSON.stringify(topic),
        headers: {
          'Content-Type': 'application/json',
          Authorization: authenticatedUser.token,
        },
      };
      console.log(`after${JSON.stringify(topic)}`)
  
      const response = await fetch(`/api/topics`, options);

      const createdTopic = await response.json();
      
      return createdTopic;

    } catch (err) {
      console.error('addOneTopic::error: ', err);
      throw err;
    }
  };

  const deleteOneTopic = async (id) => {
    try {
      const authenticatedUser = getAuthenticatedUser();
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authenticatedUser.token,
        },
      };
  
      const response = await fetch(`/api/topics/${id}`, options);
  
      const deletedTopic = await response.json();
  
      return deletedTopic;
    } catch (err) {
      console.error('deleteOneTopic::error: ', err);
      throw err;
    }
  };

  const updateOneTopic = async (id, newTopicData) => {
    try {
      const authenticatedUser = getAuthenticatedUser();
      const options = {
        method: 'PATCH',
        body: JSON.stringify(newTopicData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: authenticatedUser.token,
        },
      };
  
      const response = await fetch(`/api/topics/${id}`, options);
  
      const updatedTopic = await response.json();
  
      return updatedTopic;
    } catch (err) {
      console.error('updateOneTopic::error: ', err);
      throw err;
    }
  };

  const getAllCategories = async () => {
    try {
        const response = await fetch('/api/categories/?order=title');
        const getCategoryForTopic = await response.json();
        return getCategoryForTopic;
    } catch (err) {
        console.error('getAllCategories::error', err);
        throw err;
    }
};
    

  export { readAllTopics, addOneTopic, deleteOneTopic, updateOneTopic, getAllCategories };