import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'

function App() {
  return (
    <main>
      <Input id="name" label="Your Name" type="string"/>
      <Input id="age" label="Your Age" type="number"/>
      <Container as={Button} />
      <p>
        <Button href="https://google.com">A Link</Button>
      </p>
    </main>
  )
}

export default App
