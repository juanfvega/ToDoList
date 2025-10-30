import { useState } from 'react'
import './App.css'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Tema personalizado con la paleta Victoria
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#f1f0f8',
          100: '#dfdaef',
          200: '#c3bae2',
          300: '#aa9dd6',
          400: '#9482ca',
          500: '#8069be',
          600: '#6d51af',
          700: '#584091',
          800: '#412f6d',
          900: '#241840',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      }
    }
  }
});


function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");

  const handleClick = () => {
    if (currentTask.trim() !== "") {
      setTasks([...tasks, { text: currentTask, completed: false }]);
      setCurrentTask("");
    }
  }

  const handleDelete = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  }

  const handleToggleComplete = (indexToToggle) => {
    setTasks(tasks.map((task, index) => 
      index === indexToToggle 
        ? { ...task, completed: !task.completed }
        : task
    ));
  } 

  return (
    <CssVarsProvider theme={theme}>
      <div className="app-container">
        <h1 className="app-title">Task Tracker</h1>
        
        <div className="input-container">
          <Input 
            color="primary" 
            variant="outlined" 
            placeholder="Escribe una tarea..."
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            sx={{
              '--Input-focusedThickness': '2px',
              '--Input-focusedHighlight': 'var(--joy-palette-primary-400)',
            }}
            endDecorator={
              <Button 
                color="primary" 
                variant="solid" 
                onClick={handleClick}
                sx={{
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              >
                ↵
              </Button>
            }
          />
        </div>
        
        {/* Lista de tareas */}
        <div className="tasks-list">
          {tasks.map((task, index) => (
            <div key={index} className="task-item">
              <div className="task-content">
                <Checkbox 
                  className="task-checkbox"
                  color="primary"
                  variant="outlined"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(index)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'var(--joy-palette-primary-50)',
                    }
                  }}
                />
                <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                  {task.text}
                </span>
              </div>
              <IconButton 
                variant="soft" 
                size="sm"
                onClick={() => handleDelete(index)}
                sx={{
                  borderRadius: '50%',
                  backgroundColor: 'var(--victoria-100)',
                  color: 'var(--victoria-800)',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    backgroundColor: 'var(--victoria-200)',
                    color: 'var(--victoria-900)',
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
    </CssVarsProvider>
  )
}

export default App
