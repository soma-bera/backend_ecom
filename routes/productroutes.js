const { Router } = require('express');
const { createproduct, getproduct, updateproduct, deleteproduct , bulkinsert} = require('../controller/productcontroller');

const router = Router();

router.post('/', createproduct);
router.post('/bulk',bulkinsert);
router.get('/', getproduct);
router.put('/:id', updateproduct);
router.delete('/:id', deleteproduct);

module.exports = router;
//exports.router = router;

