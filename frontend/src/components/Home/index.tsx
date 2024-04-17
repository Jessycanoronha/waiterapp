import home from '../../assets/images/home.png'
import { Orders } from '../Orders'
import { Container } from './styles'

export function Home() {
  return (
    <>
      <Container>
        <img src={home} alt="Home" />
        <h1>Home</h1>
        <span>Acompanhe os pedidos dos clientes</span>
      </Container>
      <div>
        <Orders />
      </div>
    </>
  )
}
