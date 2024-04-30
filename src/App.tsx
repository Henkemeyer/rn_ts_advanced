import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import { List } from './components/List';
import { IconButton } from './components/IconButton';
import { Card } from './components/Card';

function HeartIcon() {
  return <span>❤️</span>;
}

function FrownIcon() {
  return <span>☹️</span>;
}

function App() {
  const users = [
    { id: 'u1', name: 'Max' },
    { id: 'u2', name: 'Manuel' },
  ];

  const hobbies = ['Sports', 'Reading', 'Cooking'];

  return (
    <main>
      <Input id="name" label="Your Name" type="string"/>
      <Input id="age" label="Your Age" type="number"/>
      <Container as={Button}>Click Me</Container>
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
      <IconButton icon={HeartIcon} onClick={() => console.log('Button clicked!')}>
      Like
    </IconButton>
    <section>
      <IconButton icon={FrownIcon} onClick={() => console.log('Button clicked!')}>
        Dislike
      </IconButton>
    </section>
    </main>
  )
}

export default App
