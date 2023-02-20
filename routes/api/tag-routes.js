const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	try {
		const tagData = await Tag.findAll({ include: [Product] });
		res.json(tagData);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.get('/:id', async (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	try {
		const singleTag = await Tag.findOne({
			where: { id: req.params.id },
			include: [Product],
		});
		res.json(singleTag);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post('/', async (req, res) => {
	// create a new tag
	try {
		const newTag = await Tag.create(req.body);
		res.json(newTag);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.put('/:id', async (req, res) => {
	// update a tag's name by its `id` value
	try {
		const updateTag = await Tag.update(req.body, { where: { id: req.params.id } });
		res.json(updateTag);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.delete('/:id', async (req, res) => {
	// delete on tag by its `id` value
	try {
		const deleteTag = await Tag.delete({
			where: { id: req.params.id },
		});
		res.json(deleteTag);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
