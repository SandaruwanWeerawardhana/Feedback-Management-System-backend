import service from '../service/feedbackService.js';

export const getAll = async (req, res) => {
  try {
    const feedbacks = await service.listAll();
    res.json(feedbacks);
  } catch (err) {
    console.error('Error retrieving feedback entries:', err);
    res.status(500).json({ 
      error: 'Failed to retrieve feedback entries', 
      details: err.message 
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await service.findById(id);
    
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    res.json(feedback);
  } catch (err) {
    console.error('Error retrieving feedback by id:', err);
    res.status(500).json({ 
      error: 'Failed to retrieve feedback', 
      details: err.message 
    });
  }
};

export const create = async (req, res) => {
  try {
    const { name, email, rating, comments } = req.body;
    
    if (!name || !email || !rating) {
      return res.status(400).json({ error: 'Name, email, and rating are required' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const newFeedback = await service.create(req.body);
    res.status(201).json(newFeedback);
  } catch (err) {
    console.error('Error creating feedback:', err);
    res.status(500).json({ 
      error: 'Failed to create feedback', 
      details: err.message 
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, rating, comments } = req.body;
    
    if (!name || !email || !rating) {
      return res.status(400).json({ error: 'Name, email, and rating are required' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const affectedRows = await service.update(id, req.body);
    
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    res.json({ id: parseInt(id), name, email, rating, comments });
  } catch (err) {
    console.error('Error updating feedback:', err);
    res.status(500).json({ 
      error: 'Failed to update feedback', 
      details: err.message 
    });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await service.remove(id);
    
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting feedback:', err);
    res.status(500).json({ 
      error: 'Failed to delete feedback', 
      details: err.message 
    });
  }
};