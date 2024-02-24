// this files contains repository that interact with databases
const db = require('../../db');

exports.getCourses = async (query) => {
    let whereClause = '';
    const values = [];

    // Check if 'name' is provided
    if (query.name) {
        whereClause += whereClause ? ' AND' : ' WHERE';
        whereClause += ' (university_name LIKE ? OR course_name LIKE ?)';
        values.push(`%${query.name}%`, `%${query.name}%`);
    }

    // Check if 'level' is provided
    if (query.level) {
        whereClause += whereClause ? ' AND' : ' WHERE';
        whereClause += ' level_name LIKE ?';
        values.push(`%${query.level}%`);
    }

    // Check if 'country' is provided
    if (query.country) {
        whereClause += whereClause ? ' AND' : ' WHERE';
        whereClause += ' country_name LIKE ?';
        values.push(`%${query.country}%`);
    }

    const sql = `
        SELECT Course.*, University.university_name, Country.country_name, EducationLevel.level_name
        FROM Course
        JOIN University ON Course.university_id = University.university_id
        JOIN Country ON University.country_id = Country.country_id
        JOIN EducationLevel ON Course.level_id = EducationLevel.level_id
        ${whereClause}
    `;

    // Example: Log the SQL query and parameters for debugging
    console.log('SQL Query:', sql);
    console.log('SQL Parameters:', values);

    const [rows] = await db.query(sql, values);

    return rows;
}

exports.getCoursesWithScholarships = async (query) => {
    let whereClause = '';
    const values = [];
  
    // Check if 'name' is provided
    if (query.name) {
        whereClause += whereClause ? ' AND' : ' WHERE';
        whereClause += ' (University.university_name LIKE ? OR Course.course_name LIKE ?)';
        values.push(`%${query.name}%`, `%${query.name}%`);
    }

    // Check if 'level' is provided
    if (query.level) {
        whereClause += whereClause ? ' AND' : ' WHERE';
        whereClause += ' EducationLevel.level_name LIKE ?';
        values.push(`%${query.level}%`);
    }

    // Check if 'country' is provided
    if (query.country) {
        whereClause += whereClause ? ' AND' : ' WHERE';
        whereClause += ' Country.country_name LIKE ?';
        values.push(`%${query.country}%`);
    }

    const sql = `
        SELECT 
        Course.*, 
        University.university_name, 
        Country.country_name, 
        EducationLevel.level_name,
        Scholarship.*
        FROM Course
        JOIN University ON Course.university_id = University.university_id
        JOIN Country ON University.country_id = Country.country_id
        JOIN EducationLevel ON Course.level_id = EducationLevel.level_id
        LEFT JOIN Scholarship ON 
        Course.university_id = Scholarship.university_id AND 
        Course.level_id = Scholarship.level_id
        ${whereClause}
    `;

    const [rows] = await db.query(sql, values);

    return rows
}

exports.getScholarshipsForCourse = async (courseId) => {
    const sql = `
      SELECT Scholarship.*, University.university_name, EducationLevel.level_name
      FROM Scholarship
      JOIN University ON Scholarship.university_id = University.university_id
      JOIN EducationLevel ON Scholarship.level_id = EducationLevel.level_id
      WHERE Scholarship.university_id = (
        SELECT university_id FROM Course WHERE course_id = ?
      )
      AND Scholarship.level_id = (
        SELECT level_id FROM Course WHERE course_id = ?
      )
    `;
  
    // Example: Log the SQL query and parameters for debugging
    console.log('SQL Query:', sql);

    const [rows] = await db.query(sql, [courseId, courseId]);

    if(rows.length === 0) return null;

    return rows[0]
  };