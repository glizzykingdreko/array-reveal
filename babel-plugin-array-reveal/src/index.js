const vm = require('vm');

module.exports = function (babel) {
    const { types: t } = babel;

    function isArrayDeclaration(node) {
        return t.isVariableDeclaration(node) && node.declarations.length === 1 && (
            t.isArrayExpression(node.declarations[0].init) ||
            (t.isStringLiteral(node.declarations[0].init) && node.declarations[0].init.value.includes(','))
        );
    }

    return {
        name: "array-reveal",
        pre(state) {
            this.arrayFunctionName = null;
            this.shuffleFunctionIdentified = false;
            this.decryptFunction = false;
            this.context = vm.createContext({});
            this.debug = state.opts.debug || false;
        },
        visitor: {
            Program: {
                enter(path, state) {
                    const log = (...args) => {
                        if (this.debug) {
                            console.log(...args);
                        }
                    };

                    // First pass: Find array function
                    path.traverse({
                        FunctionDeclaration(path) {
                            if (!this.arrayFunctionName && (
                                (
                                    path.node.body.body.length === 2 && (
                                        isArrayDeclaration(path.node.body.body[0]) &&
                                        t.isReturnStatement(path.node.body.body[1]) &&
                                        t.isCallExpression(path.node.body.body[1].argument) &&
                                        t.isAssignmentExpression(path.node.body.body[1].argument.callee) &&
                                        path.node.body.body[1].argument.callee.left.name === path.node.id.name
                                    )
                                ) || (
                                    path.node.body.body.length === 3 && (
                                        isArrayDeclaration(path.node.body.body[0]) &&
                                        t.isExpressionStatement(path.node.body.body[1]) &&
                                        t.isAssignmentExpression(path.node.body.body[1].expression) &&
                                        t.isIdentifier(path.node.body.body[1].expression.left) &&
                                        path.node.body.body[1].expression.left.name === path.node.id.name &&
                                        t.isReturnStatement(path.node.body.body[2]) &&
                                        t.isCallExpression(path.node.body.body[2].argument) &&
                                        t.isIdentifier(path.node.body.body[2].argument.callee) &&
                                        path.node.body.body[2].argument.callee.name === path.node.id.name
                                    )
                                )
                            )) {
                                this.arrayFunctionName = path.node.id.name;
                                log("1. Identified array function as", this.arrayFunctionName);
                                vm.runInContext(path.hub.getCode(), this.context);
                                path.remove();
                            }
                        }
                    }, this);

                    if (!this.arrayFunctionName) {
                        throw new Error('No array function name found');
                    }

                    // Second pass: Find shuffle function
                    path.traverse({
                        ExpressionStatement(path) {
                            if (!this.shuffleFunctionIdentified &&
                                t.isCallExpression(path.node.expression) &&
                                t.isIdentifier(path.node.expression.arguments[0]) &&
                                path.node.expression.arguments[0].name === this.arrayFunctionName) {
                                
                                log("2. Identified shuffle function");
                                vm.runInContext(path.hub.getCode(), this.context);
                                this.shuffleFunctionIdentified = true;
                                path.remove();
                            }
                        },
                        UnaryExpression(path) {
                            if (!this.shuffleFunctionIdentified &&
                                t.isCallExpression(path.node.callee) &&
                                t.isIdentifier(path.node.callee.object) &&
                                path.node.callee.object.name === this.arrayFunctionName) {
                                
                                log("2. Identified shuffle function");
                                vm.runInContext(path.hub.getCode(), this.context);
                                this.shuffleFunctionIdentified = true;
                                path.remove();
                            }
                        }
                    }, this);

                    if (!this.shuffleFunctionIdentified) {
                        throw new Error('No shuffle function name found');
                    }

                    // Third pass: Find decrypt function
                    path.traverse({
                        FunctionDeclaration(path) {
                            if (!this.decryptFunction &&
                                path.node.body.body.length > 0 &&
                                t.isVariableDeclaration(path.node.body.body[0]) &&
                                t.isCallExpression(path.node.body.body[0].declarations[0].init) &&
                                t.isIdentifier(path.node.body.body[0].declarations[0].init.callee) &&
                                path.node.body.body[0].declarations[0].init.callee.name === this.arrayFunctionName) {
                                
                                this.decryptFunction = path.node.id.name;
                                log("3. Identified decrypt function as", this.decryptFunction);
                                vm.runInContext(path.hub.getCode(), this.context);
                                path.remove();
                            }
                        }
                    }, this);

                    if (!this.decryptFunction) {
                        throw new Error('No decrypt function name found');
                    }

                    // Final pass: Replace decrypt function calls
                    path.traverse({
                        CallExpression(path) {
                            if (t.isIdentifier(path.node.callee) &&
                                t.isNumericLiteral(path.node.arguments[0])) {
                                try {
                                    path.replaceWith(
                                        t.valueToNode(
                                            vm.runInContext(
                                                this.decryptFunction + "(" + path.node.arguments[0].value + ")",
                                                this.context
                                            )
                                        )
                                    );
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                        },
                        VariableDeclarator(path) {
                            if (
                                // check for Identifiers associated to the decrypt function
                                t.isIdentifier(path.node.id) &&
                                t.isIdentifier(path.node.init) &&
                                path.node.init.name === this.decryptFunction
                            ) {
                                path.remove();
                            }
                        }
                    }, this);
                }
            }
        }
    };
}; 