import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import customAxios from '../../../interceptor/axios-interceptor';

export default function Passenger({ passengers }) {
  const [passengerData, setPassengers] = useState([]);
  const deleteRow = (event, id) => {
    event.preventDefault();
    const isConfirm = window.confirm("Are you sure want to remove ?");
    if (isConfirm) {
      customAxios.delete('https://api.instantwebtools.net/v1/passenger/' + id,)
        .then(resp => resp.data)
        .then(res => {
          alert(res.message);
          getAll();
        })
        .catch(err => {  })
    }
  }

  useEffect(() => {
    setPassengers(passengers);
  }, [])

  const getAll = async () => {
    customAxios.get('https://api.instantwebtools.net/v1/passenger?page=0&size=10')
      .then(resp => resp.data)
      .then(res => {
        setPassengers(res.data);
      })
      .catch(err => {  })
  }
  return (
    <>
      <div className="container d-flex align-items-center flex-column mt-4">
        <div className='w-100 text-right'>
          <Link href={"/"}><a>Create Passenger</a></Link>
        </div>
        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th>Edit</th>
              <th>Name</th>
              <th>Trip(s)</th>
              <th>AirLine(s)</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              passengerData.map((each, idx) => (
                <tr key={idx}>
                  <td><Link href={`/passenger/update/${each._id}`}><a >Edit</a></Link></td>
                  <td>{each.name}</td>
                  <td>{each.trips}</td>
                  <td>{each.airline[0].name}</td>
                  <td><Link href={"/"}><a onClick={(e) => deleteRow(e, each._id)} >Delete</a></Link></td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://api.instantwebtools.net/v1/passenger?page=0&size=10`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }


  return {
    props: {
      passengers: data.data
    }, 
  }
}
