import { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import { Category } from '@/components/category/types/category'
import { PostType } from '@/types/post'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === 'GET') {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
            /\\n/g,
            '\n'
          ),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL
        })
      })
    }


    const query = req.query
    const category = query.category
    const db = admin.firestore()
    const now = new Date()

    const docCategory = await db
      .collection('category')
      .where('name', '==', category ?? '')
      .get()
    const docPosts = !docCategory.empty
      ? await db
          .collection('post')
          .where('publish', '==', true)
          .where('releaseDate', '<', now)
          .where('category', '==', (docCategory.docs[0].data() as Category).id)
          .orderBy('releaseDate','desc')
          .get()
      : await db
          .collection('post')
          .where('publish', '==', true)
          .where('releaseDate', '<', now)
          .orderBy('releaseDate','desc')
          .get()
          

    if (docPosts.empty) {
      return res.status(200).json([])
    }

    const posts = docPosts.docs.map((docPost) => {
      const post = docPost.data() as PostType

      const releaseDate = new Date(post.releaseDate.seconds * 1000).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: "numeric",
        minute: "numeric"

      });
      console.log(releaseDate) 





      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        // releaseDate: post.releaseDate,
        releaseDate: releaseDate ,
        markdown: post.markdown,
        thumbnail: post.thumbnail,
        ogImage: post.ogImage,
        excerpt:post.excerpt,
        custom: post.custom ?? {}
      }
    })

    return res.status(200).json(posts)
  }
}

export default handler
