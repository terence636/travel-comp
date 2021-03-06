import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

import { createLogEntry } from '../../api/LogEntriesApi';
import { Context } from "../../Main.js";

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();
  const contextValue = useContext(Context);
 
  const username = contextValue.logState.username
  const onSubmit = async (data) => {
      console.log({data})
    try {
      setLoading(true);
      data.latitude = location.lat;
      data.longitude = location.lng;
      await createLogEntry(data,username);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleCancel = () => {
        onClose();
  }


  return (
    <div className="popup">
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      { error ? <h3 className="error">{error}</h3> : null}
      <label htmlFor="title">Title</label>
      <input name="title" {...register("title", {required:true })} required/>
      <label htmlFor="comments">Comments</label>
      <textarea name="comments" {...register("comments", {required:true })} rows={3} required></textarea>
      <label htmlFor="description">Description</label>
      <textarea name="description" {...register("description", {required:true })} rows={3} required></textarea>
      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" {...register("visitDate", {required:true })} required />
      <button disabled={loading}>{loading ? 'Loading...' : 'Create Entry'}</button>
    </form>
    <button className="buttonPopUpCancel" onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default LogEntryForm;