import React from 'react'

const AddPlace = () => {
    return (
        <div className='col-6 p-2 m-2 border center'>
            <form>
                <h2 className='text-center'>Add a Place</h2>
                <div className="form-group my-2 row">
                    <div className="col">
                        <label className="form-label" htmlFor="name">Place Name</label>
                        <input className='form-control' type="text" name='name' />
                    </div>
                    <div className="col">
                        <label className="form-label" htmlFor="address">Address</label>
                        <input className='form-control' type="text" name='address' />
                    </div>
                </div>
                <div className="form-group mb-2">
                    <label className="form-label" htmlFor="notes">Notes</label>
                    <textarea className="form-control" rows={3} name="notes"></textarea>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary">Add Place</button>
                </div>
            </form >
        </div >
    )
}

export default AddPlace