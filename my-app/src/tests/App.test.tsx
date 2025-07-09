import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppTodo from '../components/AppTodo';

describe('AppTodo Component', () => {
  it('should update input value on change', () => {
    render(<AppTodo />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'New Task' } });

    expect(input).toHaveValue('New Task');
  });

  it('should add a new task on Enter key press', () => {
    render(<AppTodo />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('New Task')).toBeInTheDocument();
  });

  it('should toggle task completion status', () => {
    render(<AppTodo />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const completeButton = screen.getAllByRole('button', { name: /AcceptImage/i })[0];
    fireEvent.click(completeButton);

    const taskText = screen.getByText('New Task');
    expect(taskText).toHaveStyle('text-decoration: line-through');
  });

  it('should clear completed tasks', () => {
    render(<AppTodo />);

    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Task to complete' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    const completeButton = screen.getAllByRole('button', { name: /AcceptImage/i })[0];
    fireEvent.click(completeButton);

    const clearButton = screen.getByText('Clear completed');
    fireEvent.click(clearButton);

    expect(screen.queryByText('Task to complete')).not.toBeInTheDocument();
  });

  it('should toggle list visibility', () => {
    render(<AppTodo />);

    const toggleButton = screen.getByRole('button', { name: /arrowButton/i });
    fireEvent.click(toggleButton);

    // Проверяем, что список задач скрыт
    expect(screen.queryByText('New Task')).not.toBeInTheDocument();
  });
});
