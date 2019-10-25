import curry from './curry'

const filterObj = curry((predicateFn, obj) => {
    const newObj = {}
    
	Object.entries(obj)
	.filter( ([key, value]) => predicateFn(key, value) )
	.forEach( ([key,value]) => newObj[key] = value)
    
	return newObj
})

export default filterObj