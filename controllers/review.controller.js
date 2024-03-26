
module.exports.reviewRate = (req,res,next) => {
	try{
		const { rate,comment } = req.body;
		
	} catch(e){
		next(e);
	}
}