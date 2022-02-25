import React, { Component, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
// import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from "next/router";
import customAxios from '../../../interceptor/axios-interceptor';


const PassengerCreate = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            name: '',
            trips: '',
            airline: '',
        },
        validationSchema: yup.object({
            name: yup.string()
                .trim()
                .required('This field is required'),
            trips: yup.number("Enter valid number")
                .required('This field is required'),
            airline: yup.number("Entr valid number")
                .required('This field is required'),
        }),
        onSubmit: (data) => {

            if (!router.query.psngrID) {
                create(data);
            } else {
                update(router.query.psngrID, data);
            }
        }
    });

    const getById = (id) => {
        setIsEdit(true);
        customAxios.get('https://api.instantwebtools.net/v1/passenger/' + id,)
            .then(resp => resp.data)
            .then(res => {
                if (res) {
                    formik.setFieldValue('name', res.name);
                    formik.setFieldValue('trips', res.trips ? res.trips : 0);
                    formik.setFieldValue('airline', res.airline[0].id);
                }
            })
            .catch(err => {
                //    alert(err);
            })
    }

    useEffect(() => {
        if (router.query.psngrID) {
            getById(router.query.psngrID);
        }
        return () => {
            setIsEdit(false);
        }

    }, [router.query.psngrID]);

    const create = (data) => {
        customAxios.post('https://api.instantwebtools.net/v1/passenger', data)
            .then(res => {
                alert("passenger created successfully");
                // toast.success("passenger registered successfully");
                // props.history.push('/login');
                router.push('/passenger/list');
            })
            .catch(err => {
                toast.error(err.response.data);
            })
    }

    const update = (id, data) => {
        customAxios.put('https://api.instantwebtools.net/v1/passenger/' + id, data)
            .then(res => {
                alert("passenger update successfully");
                router.push('/passenger/list');
                // toast.success("passenger registered successfully");
                // props.history.push('/login');
            })
            .catch(err => {
                toast.error(err.response.data);
            })
    }

    return (
        <div className="container d-flex align-items-center flex-column mt-4">
            <div className="col-6 jumbotron">
                <h4>{isEdit ? 'Update' : 'Create'} Passenger</h4>
                <form className='mt-4' autoComplete="off" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label >Name</label>
                        <input name="name" className="form-control" type="text" onChange={formik.handleChange} value={formik.values.name} />
                        {formik.errors.name && formik.touched.name ? <div className="text-danger">{formik.errors.name}</div> : null}
                    </div>
                    <div className="form-group">
                        <label >Trips</label>
                        <input name="trips" className="form-control" type="number" onChange={formik.handleChange} value={formik.values.trips} />
                        {formik.errors.trips && formik.touched.trips ? <div className="text-danger">{formik.errors.trips}</div> : null}
                    </div>
                    <div className="form-group">
                        <label >Airline</label>
                        <input name="airline" className="form-control" type="number" onChange={formik.handleChange} value={formik.values.airline} />
                        {formik.errors.airline && formik.touched.airline ? <div className="text-danger">{formik.errors.airline}</div> : null}
                    </div>
                    <div className="d-flex justify-content-between">
                        <Link href="/passenger/list">Go to list</Link>
                        <button className="btn btn-primary" type="submit">Submit</button>

                    </div>
                </form>
            </div>
        </div>
    )

}

export default PassengerCreate;