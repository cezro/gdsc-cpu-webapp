import pool from '../../db/database/db';

export async function sendToEventForms(params) {
  try {
    const query = `INSERT INTO event_forms (RVSP_code, event_id, user_id, date_time_submited) 
        VALUES ($1, $2, $3, $4)`;
    const data = [
      params.rvsp,
      params.event_id,
      params.user_id,
      params.date_time_submited,
    ];
    pool.query(query, data);
  } catch (error) {
    console.log(error);
  }
}
