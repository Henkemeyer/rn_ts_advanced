import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Form, { FormHandle } from './components/Form';
import { List } from './components/List';
import { IconButton } from './components/IconButton';
import { Card } from './components/Card';
import { useRef } from 'react';
import TimersContextProvider from './store/timers-context';
import AddTimer from './components/AddTimer.tsx';
import Header from './components/Header.tsx';
import Timers from './components/Timers.tsx';

function HeartIcon() {
  return <span>❤️</span>;
}

function FrownIcon() {
  return <span>☹️</span>;
}

function App() {
  const nameInput = useRef<HTMLInputElement>(null)
  const ageInput = useRef<HTMLInputElement>(null)
  const userForm = useRef<FormHandle>(null)

  function handleSave(data: unknown) {
    // const extractedData = data as { name: string; age: string }
    if (
      !data ||
      typeof data !== 'object' ||
      !('name' in data) ||
      !('age' in data)
    ) {
        return;
    }

    console.log(data)
    userForm.current?.clear()
  }

  const users = [
    { id: 'u1', name: 'Max' },
    { id: 'u2', name: 'Manuel' },
  ];

  const hobbies = ['Sports', 'Reading', 'Cooking'];

  return (
    <TimersContextProvider>
    <main>
      <Form onSave={handleSave}>
        <Input id="name" label="Your Name" type="string" ref={nameInput}/>
        <Input id="age" label="Your Age" type="number" ref={ageInput}/>
        <Container as={Button}>Save</Container>
      </Form>
      <p>
        <Button href="https://google.com">A Link</Button>
      </p>
      <section>
        <h2>Users</h2>
        <List
          items={users}
          renderItem={(user) => <li key={user.id}>{user.name}</li>}
        />
      </section>
      <section>
        <h2>Hobbies</h2>
        <List
          items={hobbies}
          renderItem={(hobby) => <li key={hobby}>{hobby}</li>}
        />
      </section>
      <section>
        <Card
          title="My Card"
          actions={
            <Container as={Button} onClick={() => console.log('Button clicked!')}>
              Click Me!
            </Container>
          }
        >
        <p>
          <Input id="name" label="Your Name" type="string"/>
          <Input id="age" label="Your Age" type="number"/>
        </p>
      </Card>
      </section>
      <section>
        <IconButton icon={HeartIcon} onClick={() => console.log('Button clicked!')}>
          Like
        </IconButton>
        <IconButton icon={FrownIcon} onClick={() => console.log('Button clicked!')}>
          Dislike
        </IconButton>
      </section>
      <Header />
      <p>
        <AddTimer />
        <Timers />
      </p>
    </main>
    </TimersContextProvider>
  )
}

export default App
