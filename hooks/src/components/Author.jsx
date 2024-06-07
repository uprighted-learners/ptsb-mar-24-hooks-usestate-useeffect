// Reusable component: Author.
// Props received are: name, id

export default function Author({ name, id}) {

    // Return the following JSX for the output of this component
    return (
        <li key={id}>{name}</li>
    )
}