import { useParams } from "react-router-dom"

export default function Details() {
  const { id } = useParams()

  return (
    <h2>Detail Page</h2>
  )
}
