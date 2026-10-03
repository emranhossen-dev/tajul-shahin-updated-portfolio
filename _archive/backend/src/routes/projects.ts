import { Router, Request, Response } from 'express';
import { query } from '../config/db.js';

export const projectsRouter = Router();

// GET /api/projects - Get all public projects ordered by display_order
projectsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM projects ORDER BY display_order ASC');
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error: any) {
    console.error('Projects route error:', error);
    res.status(500).json({ success: false, message: 'Internal server error while fetching projects.' });
  }
});

// GET /api/projects/:id - Get single project details
projectsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM projects WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, message: 'Project not found.' });
      return;
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});
