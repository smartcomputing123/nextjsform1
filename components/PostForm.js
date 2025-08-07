import { useState } from 'react';
import { useRouter } from 'next/router';

const PostForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1 // Default user ID
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Content is required';
    } else if (formData.body.trim().length < 10) {
      newErrors.body = 'Content must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitAsObject = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString()
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      setSubmitResult({
        success: true,
        message: 'Post created successfully (sent as object)!',
        data: result
      });
      console.log('Object submission result:', result);

      // Reset form after successful submission
      setFormData({
        title: '',
        body: '',
        userId: 1
      });

      // Optional: Redirect after delay
      setTimeout(() => {
        router.push('/posts');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitResult({
        success: false,
        message: 'Error submitting form: ' + error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAsJSON = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      setSubmitResult({
        success: true,
        message: 'Post created successfully (sent as JSON)!',
        data: result
      });
      console.log('JSON submission result:', result);

      // Reset form after successful submission
      setFormData({
        title: '',
        body: '',
        userId: 1
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitResult({
        success: false,
        message: 'Error submitting form: ' + error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Post</h2>

      {submitResult && (
        <div className={`mb-4 p-4 rounded ${submitResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {submitResult.message}
          {submitResult.success && (
            <div className="mt-2 text-sm">
              <p>Post ID: {submitResult.data.id}</p>
            </div>
          )}
        </div>
      )}

      <form>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="body" className="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows="6"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.body ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            disabled={isSubmitting}
          ></textarea>
          {errors.body && (
            <p className="mt-1 text-sm text-red-600">{errors.body}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="userId" className="block text-gray-700 font-medium mb-2">
            User ID
          </label>
          <select
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            disabled={isSubmitting}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => (
              <option key={id} value={id}>User {id}</option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleSubmitAsObject}
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg font-medium ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit as Object'}
          </button>

          <button
            type="button"
            onClick={handleSubmitAsJSON}
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg font-medium ${isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white transition-colors`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit as JSON'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;