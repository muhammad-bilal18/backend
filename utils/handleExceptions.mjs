export function handleExceptions() {

    process.on('uncaughtException', (ex) => {
        console.log(ex.message);
        process.exit(1);
    });

    process.on('unhandledRejection', (ex) => {
        if (ex) {
            console.log(ex.message);
        } else {
            console.log('Unhandled Rejection: ' + ex);
        }
        process.exit(1);
    });
}