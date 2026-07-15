// apps/api/src/controllers/documents.ts
import type { Request, Response } from 'express';
import { prisma } from '@fsm/db';

export async function listDocuments(req: Request, res: Response) {
  try {
    const rows = await prisma.document.findMany({
      where: { companyId: req.ctx.companyId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        status: true,
        mimeType: true,
        fileSize: true,
        metadata: true,
        createdAt: true,
      },
    });
    res.json({ documents: rows });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to list documents' });
  }
}
