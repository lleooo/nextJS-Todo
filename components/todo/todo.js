const Todo = ({content, id, deleteTodo, completedTodo}) => {
    const {_id, title, description, isCompleted} = content;
    console.log(content);
    return (
        <tr className="bg-white border-b">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {id}
            </th>
            <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>
                {title}
            </td>
            <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>
                {description}
            </td>
            <td className="px-6 py-4">
                {isCompleted ? "Completed" : "Pending"}
            </td>
            <td className="px-6 py-4 flex gap-1">
                <button onClick={() => {deleteTodo(_id);}} className="py-2 px-4 bg-red-500 text-white" >Delete</button>
                {isCompleted ? "" : <button onClick={() => {completedTodo(_id);}} className="py-2 px-4 bg-green-500 text-white">Done</button>}
            </td>

        </tr>
    );
};

export default Todo;
