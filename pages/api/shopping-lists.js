import mongodb, { MongoClient } from 'mongodb';

async function handler(req, res) {
  const client = await MongoClient.connect(
    'mongodb+srv://sbh2242:sbh2242@cluster0.3gli21i.mongodb.net/?retryWrites=true&w=majority'
  );

  //create database
  const db = client.db('shopping-lists');

  if (req.method === 'GET') {
    const shoppingLists = await db
      .collection('shoppingLists')
      .find()
      .sort()
      .toArray();
    if (!shoppingLists) {
      return res.status(500).json({ message: 'Internal Server error' });
    }
    return res.status(200).json({ message: shoppingLists });
  } else if (req.method === 'POST') {
    const { title } = req.body;
    const newShoppingListItem = {
      title,
    };
    const generatedItem = await db
      .collection('shoppingLists')
      .insertOne(newShoppingListItem);
    console.log('generatedItem' + generatedItem);
    return res
      .status(201)
      .json({ message: 'ADDEED', shoppingListsItem: newShoppingListItem });
  }
}
export default handler;
